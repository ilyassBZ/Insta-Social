import React ,{useState}from 'react'
import { Avatar,Button, Paper,Grid,Typography , Container } from '@material-ui/core'
import useStyle from './styles'
import { LockOutlined } from '@material-ui/icons';
import Input from './Input'
import {useNavigate} from 'react-router-dom'
import {signin , signup} from '../../actions/auth'
import { useDispatch } from "react-redux";

const initialState = {firstName:'',lastName:'',email:'',password:'',confirmPassword:''}
 const Auth = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [isSignup,setIsSignup]= useState(false)
	const [formData,setFormData]=useState(initialState)
	const classes=useStyle()
	const state = null
	const navigate = useNavigate()
	const dispatch = useDispatch()
	//const isSignup=false
	
	const handleChange =(e)=>{
		setFormData({...formData,[e.target.name]:e.target.value})
	}
	const handleSubmit=(e) =>{

		e.preventDefault()
		if(isSignup){
			dispatch(signup(formData, navigate))
	}else{
			dispatch(signin(formData, navigate));
	}
	}
	const handleShowPassword = () =>{
		setShowPassword((prevShowPassword) => !prevShowPassword)
	}
	const switchMode =()=>{
		setIsSignup((prevIsSignup) =>!prevIsSignup)

	}
	return (
		<div>
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper}  elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlined/>
				</Avatar>
				<Typography variant="h5">
					{isSignup ?'Sign Up' :'Sign In'}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{
							isSignup && (
								<>
								
									<Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
									<Input name="lastName" label="Last Name" handleChange={handleChange}  half />
								
									
								</>
							)
						}
						<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
						<Input name="Password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
						{isSignup &&
						<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
						}
					</Grid>
					<Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
						{isSignup ? 'Sign Up' :'Sign in'}
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup ? 'ALREADY HAVE AN ACCOUNT? SIGN IN' : "DON't HAVE AN ACCOUNT? SIGN UP"}
							</Button>

						</Grid>
					</Grid>
				</form>
			</Paper>

		</Container>
		</div>
	)
}
export default Auth