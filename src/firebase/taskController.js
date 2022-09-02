import { db } from './index'
import { collection, addDoc, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";


export const addNewTask = async task => {
    await addDoc(collection(db, "tasks"), task);
    
}

export const getTasks = async () => {
    const readTask = await getDocs(collection(db, "tasks"))
    // readTask.forEach((doc) => {
    //     // console.log(doc.id, " => ", doc.data())
    // })
    

    const tasks = readTask.docs.map(doc => {
        return {...doc.data(), id: doc.id}
    })
    return tasks;
    // console.log(tasks)
}

export const updateTask = async (task) => {
    await setDoc(doc(db, 'tasks', task.id), {
        title: task.title,
        desc: task.desc
    })
}

export const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id))

}