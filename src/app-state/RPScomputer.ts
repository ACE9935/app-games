
export default function gameProcess(...args:string[]):string | boolean{

    if(args[0]==args[1]) return 'same'

    const combs:(boolean | string)[]=[]
    combs[0]=args.every(o=> o=='sc' || o=='pr')?'sc':false
    combs[1]=args.every(o=> o=='pr' || o=='rk')?'pr':false
    combs[2]=args.every(o=> o=='rk' || o=='sc')?'rk':false

    const result=combs.filter(o=>o!=false)
    return result[0]
}