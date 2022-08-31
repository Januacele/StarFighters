import axios from "axios";
import * as starRepository from '../repositories/starRepository'

export async function battle(firstUser: string, secondUser: string){
    const firstUserHUB = await getUserGitHub(firstUser);
    const secondUserHUB = await getUserGitHub(secondUser);

    const firsFighter = await getUserDataBase(firstUser);
    const secondFighter = await getUserDataBase(secondUser);

    
}


async function getUserGitHub(username: string){
    const { data } = await axios.get(`https://api.github.com/users/${usename}/repos`);
    return data;
}

async function getUserDataBase(username: string){
    const user = await starRepository.findByUsername(username);

    if(!user){
        const createUser = await starRepository.insertUser(username);
        return { id: createUser.id, username, wins: 0, losses: 0, draws: 0 };
    }
    return user;
}