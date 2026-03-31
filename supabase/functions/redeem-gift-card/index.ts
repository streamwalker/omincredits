import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.1";
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.100.1/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { code } = await req.json();
    if (!code || typeof code !== "string" || code.trim().length < 3) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Create authenticated client to get user
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role for atomic operations
    const adminClient = createClient(supabaseUrl, supabaseServiceKey);

    // Find the gift card
    const { data: card, error: cardError } = await adminClient
      .from("gift_cards")
      .select("*")
      .eq("code", code.trim())
      .single();

    if (cardError || !card) {
      return new Response(JSON.stringify({ error: "Gift card not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (card.redeemed) {
      return new Response(JSON.stringify({ error: "This gift card has already been redeemed" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark gift card as redeemed
    const { error: updateError } = await adminClient
      .from("gift_cards")
      .update({ redeemed: true, redeemed_by: user.id })
      .eq("id", card.id);

    if (updateError) {
      return new Response(JSON.stringify({ error: "Failed to redeem gift card" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get current profile
    const { data: profile } = await adminClient
      .from("profiles")
      .select("credit_balance")
      .eq("user_id", user.id)
      .single();

    const currentBalance = profile?.credit_balance ?? 0;

    // Update credit balance
    const { error: balanceError } = await adminClient
      .from("profiles")
      .update({ credit_balance: currentBalance + card.credits })
      .eq("user_id", user.id);

    if (balanceError) {
      // Rollback gift card
      await adminClient.from("gift_cards").update({ redeemed: false, redeemed_by: null }).eq("id", card.id);
      return new Response(JSON.stringify({ error: "Failed to update balance" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Log the transaction
    await adminClient.from("transactions").insert({
      user_id: user.id,
      type: "redemption",
      credits_change: card.credits,
      description: `Redeemed gift card ${card.code} ($${card.amount_usd})`,
    });

    return new Response(
      JSON.stringify({
        credits: card.credits,
        newBalance: currentBalance + card.credits,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
