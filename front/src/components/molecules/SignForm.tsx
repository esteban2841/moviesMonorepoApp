import { MoviesContext } from "@/context"
import { createUser, retrieveUser } from "@/helpers/fetch"
import { useContext, useState } from "react"
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

export const SignForm = () => {
    const { signButonSelected, isLoginModalOpen, toggleLoginModal, setCurrentUser, setIsSignedUserData  } = useContext(MoviesContext)
    const [form, setForm] = useState({
        email:"",
        password:"",
    })
    const router = useRouter()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.currentTarget.value
        const setState = {...form,[event.currentTarget.name]:value}
        setForm(setState)
    }

    const registerNewUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void>=>{
        const url = `${process.env.BACKEND_URI}/users`
        event.preventDefault()
        const data = form
        try{
            const res = await createUser( url, 'register', data)

            toggleLoginModal && toggleLoginModal(!isLoginModalOpen)

            router.push('/')
            
        }catch (error) {
            Swal.fire({
                title: 'Error!',
                text: String(error),
                icon: 'error',
                confirmButtonText: 'Great!'
            });
        }
        
    }
    const loginUser = async (event: React.FormEvent<HTMLFormElement>): Promise<void>=>{
        const url = `${process.env.BACKEND_URI}/users`
        event.preventDefault()
        const data = form
        try{
            const res = await createUser( url, 'login', data)
            Swal.fire({
                title: 'Success!',
                text: 'Your operation completed successfully.',
                icon: 'success',
                confirmButtonText: 'Great!'
            });
            const user = res.user
            
            const userString = (user._id)
            
            router.push(`/user?id=${encodeURIComponent(userString)}`);

            setCurrentUser && setCurrentUser(res.user)
            router.push(`/user?id=${encodeURIComponent(res.user._id)}`);
            toggleLoginModal && toggleLoginModal(!isLoginModalOpen)
            
        }catch (error) {
            Swal.fire({
                title: 'Error!',
                text: String(error),
                icon: 'error',
                confirmButtonText: 'Great!'
              });
        }
      
    }

    if(signButonSelected == 'sign'){

        return (
            <form onSubmit={registerNewUser} className="flex flex-col w-2/3 gap-4 py-10">
                <input onChange={handleInputChange} value={form.email} name="email" className="rounded-lg h-[35px] py-2 px-4 text-[#000]" placeholder="Email" type="text" />
                <input onChange={handleInputChange} value={form.password} name="password" className="rounded-lg h-[35px] py-2 px-4 text-[#000]" placeholder="Password" type="password" />
                <button type="submit" className="bg-[#F0B90B] py-2 px-4 rounded-lg">Register now with your e-mail</button>
            </form>
        )
    }
    if(signButonSelected == 'log'){
        return (
            <form onSubmit={loginUser} className="flex flex-col w-2/3 gap-4 py-10">
                <input onChange={handleInputChange} value={form.email} name="email" className="rounded-lg h-[35px] py-2 px-4 text-[#000]" placeholder="Email" type="text" />
                <input onChange={handleInputChange} value={form.password} name="password" className="rounded-lg h-[35px] py-2 px-4 text-[#000]" placeholder="Password" type="password" />
                <button type="submit" className="bg-[#F0B90B] py-2 px-4 rounded-lg">Log in</button>
            </form>
        )

    }
}
