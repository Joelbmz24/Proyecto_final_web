const Button = ({title, onButton = () => {}}) => {
	return (
	<button 
	onClick ={() => {onButton();}}  
	className="p-2 bg-indigo-500 rounded-lg"
      style={{
        color: "#fff",
        fontVariantCaps: "small-caps",}}>{title}</button>
	);
};

export default Button;