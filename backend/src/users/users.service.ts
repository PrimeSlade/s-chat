import { Injectable, NotFoundException } from '@nestjs/common';
import { Friendship, FriendshipWithUsers, User } from '../shared';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  //Find by username
  async findUserByUserName(username: string, myId: string): Promise<User> {
    return this.usersRepository.findUserByUserName(username, myId);
  }

  //Update name
  async updateUsername(userId: string, username: string): Promise<User> {
    return this.usersRepository.updateUsername(userId, username);
  }

  //Friends
  async findFriends(myId: string): Promise<FriendshipWithUsers[]> {
    return this.usersRepository.findFriends(myId);
  }

  //Pending
  async findPendingStrangers(myId: string): Promise<Friendship[]> {
    return this.usersRepository.findPendingStrangers(myId);
  }

  //Add user via ids
  async addUser(receiverId: string, senderId: string): Promise<Friendship> {
    // throw new NotFoundException();

    return this.usersRepository.addUser(receiverId, senderId);
  }

  //Accept
  async acceptUser(receiverId: string, senderId: string): Promise<Friendship> {
    return this.usersRepository.acceptUser(receiverId, senderId);
  }

  //Block
  async blockUser(receiverId: string, senderId: string): Promise<Friendship> {
    return this.usersRepository.blockUser(receiverId, senderId);
  }
}
