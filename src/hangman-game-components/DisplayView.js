

function DisplayView({tries}) {
    return ( 
        <>
    <svg className="hangman" height="250" width="160" xmlns="http://www.w3.org/2000/svg">
    {/* Gallows */}
    <line className={tries<10&&"path"} x1="20" y1="230" x2="120" y2="230" stroke="black" strokeWidth="7" />
    <line className={tries<9&&"path"} x1="60" y1="30" x2="60" y2="230" stroke="black" strokeWidth="5" />
    <line className={tries<8&&"path"} x1="58" y1="30" x2="120" y2="30" stroke="black" strokeWidth="5" />
    <line className={tries<7&&"path"} x1="120" y1="28" x2="120" y2="50" stroke="black" strokeWidth="5" />

    {/* Head */}
    <circle className={tries<6&&"path"} cx="120" cy="70" r="20" stroke="black" strokeWidth="5" fill="transparent" />

    {/* Body */}
    <line className={tries<5&&"path"} x1="120" y1="90" x2="120" y2="150" stroke="black" strokeWidth="5" />

    {/* Left Arm */}
    <line className={tries<4&&"path"} x1="120" y1="100" x2="90" y2="120" stroke="black" strokeWidth="5" />

    {/* Right Arm */}
    <line className={tries<3&&"path"} x1="120" y1="100" x2="150" y2="120" stroke="black" strokeWidth="5" />

    {/* Left Leg */}
    <line className={tries<2&&"path"} x1="120" y1="150" x2="90" y2="180" stroke="black" strokeWidth="5" />

    {/* Right Leg */}
    <line className={tries<1&&"path"} x1="120" y1="150" x2="150" y2="180" stroke="black" strokeWidth="5" />
  </svg>
        </>
     );
}

export default DisplayView;