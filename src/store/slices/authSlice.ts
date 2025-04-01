import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { auth } from '../../FirebaseConfig';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  signOut,
  AuthError
} from 'firebase/auth';

interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  token?: string;
  emailVerified?: boolean;
}

interface AuthState {
  currentUser: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isEmailVerified: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  token: null,
  status: 'idle',
  error: null,
  isEmailVerified: false,
};

const mapFirebaseUser = (user: FirebaseUser): User => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
  token: undefined // Will be set separately
});

// API Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // Option 1: Use your API
      const apiResponse = await fetch('https://builder.free.beeceptor.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!apiResponse.ok) {
        const error = await apiResponse.json().catch(() => ({}));
        return rejectWithValue(error.message || 'Login failed');
      }

      const apiData = await apiResponse.json();
      
      // Option 2: Fallback to Firebase if API fails
      if (!apiData.token) {
        const firebaseUserCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await firebaseUserCredential.user.getIdToken();
        return {
          token,
          user: mapFirebaseUser(firebaseUserCredential.user)
        };
      }

      return apiData;

    } catch (error: unknown) {
      let errorMessage = 'Login failed';
      if (typeof error === 'object' && error !== null && 'code' in error) {
        const authError = error as AuthError;
        if (authError.code === 'auth/invalid-credential') {
          errorMessage = 'Invalid email or password';
        } else if (authError.message) {
          errorMessage = authError.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

// Firebase logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error: unknown) {
      const errorMessage = (error as AuthError)?.message || 'Logout failed';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FirebaseUser | null>) => {
      if (action.payload) {
        state.currentUser = mapFirebaseUser(action.payload);
        state.isEmailVerified = action.payload.emailVerified;
      } else {
        state.currentUser = null;
        state.token = null;
        state.isEmailVerified = false;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.isEmailVerified = action.payload.user.emailVerified || false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.token = null;
        state.status = 'idle';
        state.isEmailVerified = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.currentUser;
export const selectIsEmailVerified = (state: RootState) => state.auth.isEmailVerified;
export const selectAuth = (state: RootState) => state.auth;


// Actions
export const { 
  setCurrentUser, 
  clearError, 
  updateUserProfile 
} = authSlice.actions;

export default authSlice.reducer;