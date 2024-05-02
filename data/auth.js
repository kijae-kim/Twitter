let users = [
    {
        id: '1',
        username: "apple",
        password: "$2b$10$th0FSiGtT2C20S8hbNMSGOHU56iqiAG6mn5vWdSUHLGqfRtRy6Kju",
        name: "김사과",
        email: "apple@apple.com",
        url: "https://www.logoyogo.com/web/wp-content/uploads/edd/2021/02/logoyogo-1-45.jpg"
    },
    {
        id: '2',
        username: "banana",
        password: "2222",
        name: "반하나",
        email: "banana@banana.com",
        url: "https://img.freepik.com/premium-vector/banana-cute-kawaii-style-fruit-character-vector-illustration_787461-1772.jpg"
    }
]
//아이디(username) 중복검사
export async function findByUsername(username){
    return users.find((user)=>user.username === username);
}

// id 중복검사
export async function findById(id){
    return users.find((user)=> user.id === id);
}

export async function createUser(user){
    const created = {id:'10, ...user'};
    users.push(created);
    return created.id;
}
export async function login(username){
    return users.find((users) => users.username === username);
}