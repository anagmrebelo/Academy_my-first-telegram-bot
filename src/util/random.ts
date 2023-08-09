// You can ignore the implementation of the helper function(s) in this file

/** Returns one element at random from the given array.  
 * Given array must have at least one element in it.  
 * */
export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
