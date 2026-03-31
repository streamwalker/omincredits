-- Allow anyone to insert gift cards (purchase flow doesn't require auth)
CREATE POLICY "Anyone can insert gift cards"
ON public.gift_cards
FOR INSERT
TO public
WITH CHECK (true);
