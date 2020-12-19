import { Photo } from '../profile/profile.component';

export class User {
    username: string
    email: string;
    password: string;
    photo?:Photo;
}