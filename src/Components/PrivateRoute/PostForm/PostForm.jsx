import services from "../../../Services/user.services";

const PostForm = () => {
    const onSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);

        const post = Object.fromEntries(formData.entries());
        const token = localStorage.getItem('token');
        console.log(post);
        
        if(post.title.length < 8 || post.title.length >32) return alert("The title must be between 8 and 32 characters");

        if(post.description.length < 8) return alert("The description must be at least 8 characters long");

        if(!post.image.startsWith('https://')) return alert("The image must be imported through a url");

        const res = services.createPost(post.title, post.description, post.image);
        
        console.log(res);
    }

    return(
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center w-full h-full p-2 m-2 md:h-full md:p-1 md:m-1 lg:h-3/4">
           
            <input type="text" placeholder="Titulo" name="title" id="title"  
            className="font-medium h-1/2 text-gray-900 focus:outline-none p-2 rounded-lg bg-pink-50 focus:ring text-center ring-pink-200 w-1/2 p-2 m-2 md:p-1 md:m-1"/>          
            <input type="text" placeholder="Descripción" name="description" id="description" 
            className="break-words resize-y whitespace-normal overscroll-y-auto overflow-ellipsis font-medium h-1/2 text-gray-900 focus:outline-none p-2 rounded-lg bg-pink-50 focus:ring text-center ring-pink-200 w-1/2 p-2 m-2 md:m-1 lg:p-4 lg:h-4/6"/>
            <input type="text" placeholder="URL Imagen" name="image" id="image" 
            className="font-medium h-1/2 text-gray-900 focus:outline-none p-2 rounded-lg bg-pink-50 focus:ring text-center ring-pink-200 w-1/2 p-2 m-2 md:p-1 md:m-1"/>
            <button className="mt-6 w-full lg:w-3/4 transition duration-300 ease-in-out rounded-lg text-lg text-extrabold uppercase bg-purple-500 hover:bg-purple-700 py-2 px-4 text-white" >Añadir</button>
        </form>
    )
}

export default PostForm;