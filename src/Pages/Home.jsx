import axios from 'axios';
import { Button, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
    let placeRef = useRef();
    let priceRef = useRef();
    let dateRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setselectedId] = useState("");
    let user = JSON.parse(localStorage.getItem('expenseLogin'));
    let updateNameRef = useRef();
    let updatePriceRef = useRef();
    let updateDateRef = useRef();

    const showModal = () => setIsModalOpen(true);
    const handleOk = async () => {
        let obj = {};
        if (updateDateRef.current.value) obj.date = updateDateRef.current.value;
        if (updatePriceRef.current.value) obj.price = updatePriceRef.current.value;
        if (updateNameRef.current.value) obj.expenseName = updateNameRef.current.value;

        let res = await axios.put(`http://localhost:8080/api/expense/update/${selectedId}`, obj);
        getData();
        updateNameRef.current.value = "";
        updateDateRef.current.value = "";
        updatePriceRef.current.value = "";
        setIsModalOpen(false);
    };
    const handleCancel = () => setIsModalOpen(false);

    const handlesubmit = async (e) => {
        e.preventDefault();
        let obj = {
            expenseName: placeRef.current.value,
            price: priceRef.current.value,
            date: dateRef.current.value,
            userId: user._id
        };
        const expenseExists = arr.find(expense => expense.expenseName === obj.expenseName);
        if (expenseExists) {
            alert("Expense already exists");
            return;
        }
        await axios.post('http://localhost:8080/api/expense/create', obj);
        getData();
        placeRef.current.value = "";
        priceRef.current.value = "";
        dateRef.current.value = "";
    };

    const [arr, setarr] = useState([]);
    const getData = async () => {
        let res = await axios.post('http://localhost:8080/api/expense/getexpense', { userId: user._id });
        setarr(res.data.data);
    };
    useEffect(() => { getData(); }, []);

    const handleDelete = async (expenseId) => {
        try {
            await axios.delete(`http://localhost:8080/api/expense/delete/${expenseId}`);
            getData();
        } catch (error) {
            console.error("Error deleting the expense:", error);
        }
    };

    const handleUpdate = (ans) => {
        setselectedId(ans._id);
        showModal();
    };

    const [searchValue, setsearchValue] = useState("");
    const handleSearchChange = (e) => setsearchValue(e.target.value);
    let filteredExpense = searchValue ? arr.filter(ele => ele.expenseName.toLowerCase().includes(searchValue.toLowerCase())) : arr;

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <form className='bg-black my-3 p-5 flex flex-col md:flex-row justify-center gap-2 rounded-md'>
                <input ref={placeRef} type="text" className='py-1 px-7 w-full md:w-auto' placeholder='Enter Expense Name'/>
                <input ref={priceRef} type="number" className='py-1 px-7 w-full md:w-auto' placeholder='Enter Price'/>
                <input ref={dateRef} type="date" className='py-1 px-7 w-full md:w-auto' placeholder='Enter Date'/>
                <button className='bg-white text-black rounded-md py-2 px-4 w-full md:w-auto' onClick={handlesubmit}>Add Item</button>
            </form>
            <div className='my-4 w-full md:w-1/2 mx-auto'>
                <input onChange={handleSearchChange} className='border border-blue-950 py-2 px-4 w-full' type="text" placeholder='Filter expenses by name' />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">S.no</th>
                            <th className="px-6 py-3">Expense Name</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredExpense.map((ele, i) => (
                            <tr key={i} className="bg-white border-b">
                                <th className="px-6 py-4 font-medium text-gray-900">{i + 1}</th>
                                <td className="px-6 py-4">{ele.expenseName}</td>
                                <td className="px-6 py-4">{ele.price}</td>
                                <td className='px-6 py-4'>{ele.date}</td>
                                <td className="px-6 py-4 flex gap-2 justify-center">
                                    <button onClick={() => handleDelete(ele._id)} className='bg-red-700 rounded-md px-2 py-1 text-white'>Delete</button>
                                    <button onClick={() => handleUpdate(ele)} className='bg-blue-700 rounded-md px-2 py-1 text-white'>Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal title="Update Expense Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='flex flex-col gap-2'>
                    <input ref={updateNameRef} className='py-2 px-4 border rounded-md' type="text" placeholder='Enter Expense Name'/>
                    <input ref={updatePriceRef} className='py-2 px-4 border rounded-md' type="number" placeholder='Enter Price'/>
                    <input ref={updateDateRef} className='py-2 px-4 border rounded-md' type="date" placeholder='Enter Date'/>
                </div>
            </Modal>
        </div>
    );
};

export default Home;
