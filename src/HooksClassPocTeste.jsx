import { useCallback, useEffect, useMemo, useState } from "react"

export function Teste () {
    let [count, setCount] = useState(0)

    function onClick () {
        console.log(count)
        setCount(count + 1)
    }

    const alerta = useCallback(() => {
        alert(count)
    }, [count])

    const abc = useMemo(() => {
        return count + 1
    }, [count])

    console.log('abc', abc)

    useEffect(() => {
        if (count === 5) {
            alerta()
        }

        console.log('MUDOU')
    }, [count])

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={onClick}>Increment</button>
        </div>
    )
}