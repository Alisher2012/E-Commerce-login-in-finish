export const BASE_URL = "https://ecommercev01.pythonanywhere.com"; 

export const getCategory = () => {
  return fetch(`${BASE_URL}/product/categories/`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const getProduct = () => {
  return fetch(`${BASE_URL}/product/list/`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const getProductById = (id) => {
  return fetch(`${BASE_URL}/product/detail/${id}/`)
    .then((response) => {
      if (!response.ok) throw new Error('Not found');
      return response.json();
    })
    .catch(() => {
      // Fallback: fetch all and find
      return getProduct().then(products => {
        return products.find(p => p.id === parseInt(id));
      });
    });
};

export const getMembers = () => {
  return fetch(`${BASE_URL}/about/members/`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const getAbout = () => {
  return fetch(`${BASE_URL}/about/list/`)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};






export const registerFunc = (name, email, password) => {
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "first_name": name,
  "email_or_phone": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

return fetch("https://ecommercev01.pythonanywhere.com/user/register/", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    return(result)
  })
  .catch((error) => {
   return(error);
  });
}



export const loginFunc = (email, password) => {
  console.log(email, password);
  


  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "email_or_phone": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

return   fetch("https://ecommercev01.pythonanywhere.com/user/token/", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    return result;
  })
  .catch((error) => console.error(error));
}


export const getUserInfo = (token) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  return fetch("https://ecommercev01.pythonanywhere.com/user/detail/", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};

export const updateUserInfo = (token, data) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify(data);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  return fetch("https://ecommercev01.pythonanywhere.com/user/update/", requestOptions)
    .then((response) => response.json())
    .catch((error) => console.error(error));
};