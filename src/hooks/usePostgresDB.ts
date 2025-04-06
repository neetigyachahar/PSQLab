import { useContext, useEffect, useState } from 'react';

import { DBContext } from '../contexts/DBContext';
import queries from '../queries/queries';

const usePostgresDB = () => {
    const { db } = useContext(DBContext)

    const [loadingData, setLoadData] = useState(true)


    const loadQuery = async () => {
        try {
            setLoadData(true)
            for (const query of queries) {
                await db.exec(query)
            }
            setLoadData(false)
        } catch (error) {
            setLoadData(false)
            // console.error(error)
        }
    }

    useEffect(() => {
        loadQuery()
    }, [])

    return ({ pg: db, loadingData })
}

export default usePostgresDB
