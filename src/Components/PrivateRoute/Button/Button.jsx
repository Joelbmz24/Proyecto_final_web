const Button = ({title, onButton = () => {}}) => {
	return (
	<button 
	onClick ={() => {onButton();}}  
	className="px-2 py-1 bg-indigo-500 rounded"
      style={{
        color: "#fff",
        fontVariantCaps: "small-caps",}}>{title}</button>
	);
};

export default Button;