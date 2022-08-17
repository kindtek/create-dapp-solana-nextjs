export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try{  
    const res = await fetch(input, init);
    return res.json();
  } catch (e) {
    console.error(e);
    throw new Error('error :' + input);
  }
  
  
}
