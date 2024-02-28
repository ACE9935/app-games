import styled, { css } from 'styled-components'

const StyledButton = styled.button`
transition:background-color 0.4s;
&:disabled{
    background-color:brown;
    transition:background-color 0.4s;

}
`

function NormalButton({children,disabled,onClick,...props}) {
    return ( 
        <StyledButton disabled={disabled} className="p-3 font-bold transition hover:scale-[1.1] text-md bg-black text-white rounded-full min-w-[80px] h-fit" onClick={onClick}>{children}</StyledButton>
     );
}

export default NormalButton;