export async function GET(request:Request) {
  const url = "http://localhost:3000/api/v1/department";
 const respons = await fetch(url);
  const data = await respons.json();
    return data;
}