import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  location?: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
}

const initialState: UserState = {
  name: 'Mirza Zain',
  email: 'mirzazain269@gmail.com',
  location: 'Karachi, Sindh',
  role: 'Full Stack Developer',
  bio: 'Building delightful web and mobile experiences with React Native.',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
