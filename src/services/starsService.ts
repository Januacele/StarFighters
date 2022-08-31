import axios from "axios";
import * as starRepository from '../repositories/starRepository'

export async function battle(firstUser: string, secondUser: string) {
    const firstUserHUB = await getUserGitHub(firstUser);
    const secondUserHUB = await getUserGitHub(secondUser);

    const firsFighter = await getUserDataBase(firstUser);
    const secondFighter = await getUserDataBase(secondUser);

    const firstUserStarCount = getFighterStarCount(firstUserHUB);
    const secondUserStarCount = getFighterStarCount(secondUserHUB);

    return getBattleResult(
        firsFighter,
        secondFighter,
        firstUserStarCount,
        secondUserStarCount
    );
}


async function getUserGitHub(username: string) {
    const { data } = await axios.get(`https://api.github.com/users/${usename}/repos`);
    return data;
}

async function getUserDataBase(username: string) {
    const user = await starRepository.findByUsername(username);

    if (!user) {
        const createUser = await starRepository.insertUser(username);
        return { id: createUser.id, username, wins: 0, losses: 0, draws: 0 };
    }
    return user;
}

function getFighterStarCount(fighterRepos: any[]) {
    const repoStars = fighterRepos.map((repo) => repo.stargazers_count);
    if (repoStars.length === 0) return 0;

    return repoStars.reduce((current: number, sum: number) => sum + current);
}

async function getBattleResult(firstFighter: any, secondFighter: any, firstUserStarCount: number, secondUserStarCount: number) {
    if (firstUserStarCount > secondUserStarCount) {
        await updateWinnerAndLoserStats(firstFighter.id, secondFighter.id);

        return {
            winner: firstFighter.username,
            loser: secondFighter.username,
            draw: false,
        };
    }
    if (secondUserStarCount < firstUserStarCount) {
        await updateWinnerAndLoserStats(secondFighter.id, firstFighter.id);
        return {
            winner: secondFighter.username,
            loser: firstFighter.username,
            draw: false,
        };
    }
    await updateDraw(firstFighter.id, secondFighter.id);
    return { winner: null, loser: null, draw: true };
}

async function updateWinnerAndLoserStats(winnerId: number, loserId: number) {
    await starRepository.updateStatus(winnerId, "wins");
    await starRepository.updateStatus(loserId, "losses");
}

async function updateDraw(firstFighterId: number, secondFighterId: number) {
    await starRepository.updateStatus(firstFighterId, "draws");
    await starRepository.updateStatus(secondFighterId, "draws");
}
