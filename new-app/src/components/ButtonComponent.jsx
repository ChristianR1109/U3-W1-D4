const ButtonComponent = (props) => {
  // props is always going to be an object
  // holding all the props you're passing to the components
  // as keys
  return <button>{props.label}</button>
}

export default ButtonComponent
