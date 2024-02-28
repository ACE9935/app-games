import { AnimatePresence,motion } from 'framer-motion';
import styled, { css } from 'styled-components'

const StyledButton = styled(motion.button)`
${props =>
  props.$backdrop &&
  css`
  color: white;
  backdrop-filter:blur(12px);
  background-image: linear-gradient(to right, gold, red); 
  `};

`

function StartButton({ onClick, children, classNamex, animate=true, ...props }) {
  return (
      <AnimatePresence>
          <StyledButton
              {...props}
              {...(animate && {
                  transition: { type: "spring", duration: 1 },
                  initial: { top: -150, opacity: 0 },
                  animate: { top: 0, opacity: 1 }
              })}
              className={`p-8 border-4 border-amber-300 font-[900] transition-transform hover:scale-[1.06] inset-0 h-fit m-[auto] text-5xl text-white rounded-full w-max ${classNamex}`}
              onClick={onClick}
          >
              {children}
          </StyledButton>
      </AnimatePresence>
  );
}

export default StartButton;