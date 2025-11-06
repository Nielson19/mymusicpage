interface InputFieldProps {
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({label, value, onChange}) => {

    

    return(
        <div className="inputDiv">
            <input 
                type="tel" 
                className="inputBox" 
                value={value || ""}
                onChange={onChange}
                required
            />
            <span>{label}</span>
        </div>
    );
}

export default InputField;