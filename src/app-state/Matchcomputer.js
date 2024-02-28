
function getRandomItemWithFieldValue(array, fieldName, targetValue,position) {
    const matchingItems = array.filter(item => item[fieldName] === targetValue&&item.discovered === false&&item.position != position);
  
    if (matchingItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * matchingItems.length);
      return matchingItems[randomIndex];
    } else {

      return null
    }
  }

  const findDuplicates = (array) => {
    const duplicates = [];
  
    array.forEach((obj, index, array) => {
      const otherObject = array.find((otherObj, otherIndex) => {
        return (
          otherIndex !== index &&
          otherObj.index === obj.index &&
          obj.discovered === false &&
          otherObj.discovered === false &&
          otherObj.position !== obj.position
        );
      });
  
      if (otherObject) {
        duplicates.push({
          firstPosition: obj.position,
          secondPosition: otherObject.position,
        });
      }
    });
  
    return duplicates;
  };

export function availableSquares(squares,rememberedSquares){

    const y=findDuplicates(rememberedSquares)
    if(y.length>0) return [y[0].firstPosition,y[0].secondPosition]
    const x=squares.filter((o,i)=>o.opened==false&&o.discovered==false)
    const firstIndex=Math.floor(Math.random() * x.length)
    let selectedRememberedObj=getRandomItemWithFieldValue(rememberedSquares,"index",x[firstIndex].index,x[firstIndex].position)
    let secondIndex

    if(selectedRememberedObj==null){
        do{
            const positionsToRemove = rememberedSquares.map(obj => obj.position);
            const newArrayOfSquares = x.filter(obj => !positionsToRemove.includes(obj.position));
            const temporaryIndex=Math.floor(Math.random() * newArrayOfSquares.length)
            secondIndex=newArrayOfSquares[temporaryIndex].position
          }while(x[firstIndex].position===secondIndex)
    }else secondIndex=selectedRememberedObj.position
    return [x[firstIndex].position,secondIndex]
  }