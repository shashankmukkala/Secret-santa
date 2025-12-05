// Function to randomly pair participants for Secret Santa
export function randomPairing(participants) {
  if (participants.length < 2) {
    throw new Error('Need at least 2 participants');
  }

  const shuffled = [...participants].sort(() => Math.random() - 0.5);
  const pairings = {};

  for (let i = 0; i < shuffled.length; i++) {
    const giver = shuffled[i];
    const receiver = shuffled[(i + 1) % shuffled.length];
    pairings[giver.name] = receiver;
  }

  // Check if anyone got themselves (though unlikely with shuffle, but to be safe)
  for (const giver in pairings) {
    if (pairings[giver].name === giver) {
      // If someone got themselves, reshuffle
      return randomPairing(participants);
    }
  }

  return pairings;
}

// Placeholder function for generating gift suggestions based on wish list
export function generateGiftSuggestions(wishList) {
  // For now, return dummy suggestions
  return ['Chocolate', 'Coffee mug', 'Desk plant'];
}