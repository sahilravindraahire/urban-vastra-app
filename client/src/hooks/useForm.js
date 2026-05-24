import { useState } from "react";

const useForm = (initialValues) => {
    const [values, setValues] = useState(initialValues)

    const handleChange = (e) => {
        const {name, value} = e.target
        // <input name="email" value="abc@gmail.com" />
        setValues((prev) => ({...prev, [name]: value}))
    }

    const reset = () => setValues(initialValues)

    return {values, handleChange, setValues, reset}
}

export default useForm