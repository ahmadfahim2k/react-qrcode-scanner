function Button({ btnText = 'button', handleClick = () => console.log('Btn clicked') }) {
  return (
    <div>
        <button className="w-fit m-3 p-3 border-2 border-black hover:bg-slate-200 hover:shadow-lg active:shadow-lg active:bg-slate-600 active:text-white" onClick={handleClick}>
            {btnText}
        </button>
    </div>
  )
}

export default Button;