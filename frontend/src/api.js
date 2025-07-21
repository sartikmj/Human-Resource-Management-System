
const BASE_URL = 'http://localhost:8080'
export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    try{
        const options = {
            method: 'GET',
            headers:{

                'Content-Type': 'application/json'
            }
        }
        const result = await fetch(url,options);
        const data = await result.json();
        return data;
    }catch(err){
        return(err)
    }
}

export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`
    try{
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key, empObj[key]);
        }
        const options = {
            method: 'POST',
            body: formData
            // headers:{

            //     'Content-Type': 'application/json',
            // }
        }
        const result = await fetch(url,options);
        const data = await result.json();

           // Optional: check response status and structure
        return {
            success: result.ok,
            message: data?.message || 'Employee created',
            data
        };
        
    }catch(err){
        return {
            success: false,
            message: 'Internal server error',
            data: null
        };
    }
}

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`
    try{
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key, empObj[key]);
        }
        const options = {
            method: 'PUT',
            body: formData
            // headers:{

            //     'Content-Type': 'application/json',
            // }
        }
        const result = await fetch(url,options);
        const data = await result.json();

           // Optional: check response status and structure
        return {
            success: result.ok,
            message: data?.message || 'Employee created',
            data
        };
        
    }catch(err){
        return {
            success: false,
            message: 'Internal server error',
            data: null
        };
    }
}

export const DeleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
        const result = await fetch(url, {
            method: 'DELETE',
        });

        const data = await result.json();

        return {
            success: result.ok,
            message: data?.message || 'Employee Deleted',
            data,
        };

    } catch (err) {
        return {
            success: false,
            message: 'Internal server error',
            data: null,
        };
    }
};

export const GetEmployeeDetailsById = async (id) => {
    const url =
        `${BASE_URL}/api/employees/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const result = await fetch(url, options);
        const { data } = await result.json();
        console.log(data);
        return data;
    } catch (err) {
        return err;
    }
}
