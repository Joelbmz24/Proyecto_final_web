import {getPosts} from "./Functions";

const BASE_URL = "https://posts-pw2021.herokuapp.com/api/v1";

const services = {};

services.login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    }
   return {};
  } catch (error) {
    console.log(error)
  }
};

services.verifyToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/whoami`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      return data;
    }
   return {};
  } catch (error) {
    
  }

};

services.createPost = async (titleP, descriptionP, imageP) => {
  const response = await fetch(`${BASE_URL}/post/create`, {
      method: "POST",
      headers: {
          "Authorization": `Bearer ${ localStorage.getItem('token') }`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          title: titleP,
          description: descriptionP,
          image: imageP,
      })
  });

  if(response.ok) {
      const data = await response.json();
      return data;
  }
  return {};
}

services.getOwn = async (filters) => {
  const {page = 0} = filters
  try {
    const response = await fetch(`${BASE_URL}/post/owned?limit=10&page=${page}`, {
    "method": "GET",
     "headers": {
      "Authorization": `Bearer ${ localStorage.getItem('token') }`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      
      const finalData = data.data.map(getPosts);
      localStorage.setItem("pagesOwned", data.pages);
      return finalData;
    }
  }catch(error) {
      console.error({ error });
      return {status: false, posts:[] };
    }
};


services.getAll = async (filters) => {
  const {page = 0} = filters
  try {
    const response = await fetch(`${BASE_URL}/post/all?limit=10&page=${page}`, {
    "method": "GET",
     "headers": {
      "Authorization": `Bearer ${ localStorage.getItem('token') }`,

      },
    });

    if (response.ok) {
      const data = await response.json();
      
      const finalData = data.data.map(getPosts);
      localStorage.setItem("pages", data.pages);
      return finalData;
    }
  }catch(error) {
      console.error({ error });
      return {status: false, posts:[] };
    }
};

services.getLikes = async (id) => {
  try {
  const response = await fetch(`${BASE_URL}/post/like/${id}`,{
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${ localStorage.getItem('token') }`,
    },
  });
  
  if (response.ok) {
    const data = await response.json()
    return data;
  };
  } catch(error) {
  console.error(error)
  return {status: false, likes: []};
  }
  };

services.getComments = async (id, descriptionC) => {

    try {
    const response = await fetch(`${BASE_URL}/post/comment/${id}`,{
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${ localStorage.getItem('token') }`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        description: descriptionC,
      })
    });
    
    if (response.ok) {
      const data = await response.json()
      return data;
    };
    } catch(error) {
    console.error(error)
    return {status: false, comments: []};
    }
}

services.setFavorite = async (id) => {
try {
  const response = await fetch(`${BASE_URL}/post/fav/${id}`,{
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${ localStorage.getItem('token') }`,
    },
  });
  
  if (response.ok) {
    const data = await response.json()
    return data;
  };
  } catch(error) {
  console.error(error)
  return {status: false, favorite: []};
  }
};

services.getAllFavorites = async () => {
  try {
    const response = await fetch(`${BASE_URL}/post/fav`,{
      "method": "GET",
      "headers": {
        "Authorization": `Bearer ${ localStorage.getItem('token') }`,
    },
  });
      
    if(response.ok) {
      const data = await response.json();
      const finalData = data.favorites;
      return finalData;
    }
  } catch(error){
    console.error(error);
    return {status: false, posts: []};
  }
}


services.setToggle = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/post/toggle/${id}`,{
      "method": "PATCH",
      "headers": {
        "Authorization": `Bearer ${ localStorage.getItem('token') }`,
    },
  });
     if (response.ok) {
     const data = await response.json();
     console.log(data);
     return data;
  }
    
  }catch(error) {
    console.error(error);
    return {status: false, posts: []};
  }
}


services.UpdatePost = async (titleP, descriptionP, imageP, id) => {
  const response = await fetch(`${BASE_URL}/post/update/${id}`, {
      method: "PUT",
      headers: {
          "Authorization": `Bearer ${ localStorage.getItem('token') }`,
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          title: titleP,
          description: descriptionP,
          image: imageP,
      })
  });

  if(response.ok) {
      const data = await response.json();
      return data;
  }
  return {};
}


services.getOne = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/post/one/${id}`,{
      "method": "GET",
      "headers": {
        "Authorization": `Bearer ${ localStorage.getItem('token') }`,
      },
    });

    if(response.ok) {
      const data = await response.json();
      return data;
    
    }
  }catch(error){
    console.error(error);
    return {status: false, post: []};
  }
}


export default services;