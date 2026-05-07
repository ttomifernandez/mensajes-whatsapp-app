import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  Timestamp,
  QueryConstraint,
} from 'firebase/firestore';
import { getAuth, signInAnonymously, Auth } from 'firebase/auth';
import { Template } from '@/types';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let auth: Auth | null = null;

const getAuthInstance = async () => {
  if (!auth) {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Anonymous auth error:', error);
    }
  }
  return auth;
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Templates CRUD
export const createTemplate = async (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    await getAuthInstance();
    const docRef = await addDoc(collection(db, 'templates'), {
      ...template,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
};

export const getTemplates = async (): Promise<Template[]> => {
  try {
    await getAuthInstance();
    const querySnapshot = await getDocs(collection(db, 'templates'));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || 0,
      updatedAt: doc.data().updatedAt?.toMillis() || 0,
    })) as Template[];
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

export const getTemplate = async (id: string): Promise<Template | null> => {
  try {
    await getAuthInstance();
    const docSnap = await getDoc(doc(db, 'templates', id));
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toMillis() || 0,
        updatedAt: docSnap.data().updatedAt?.toMillis() || 0,
      } as Template;
    }
    return null;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

export const updateTemplate = async (id: string, updates: Partial<Template>) => {
  try {
    await getAuthInstance();
    const docRef = doc(db, 'templates', id);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };
    delete updateData.id;
    delete updateData.createdAt;
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
};

export const deleteTemplate = async (id: string) => {
  try {
    await getAuthInstance();
    await deleteDoc(doc(db, 'templates', id));
  } catch (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
};

// Get templates by category
export const getTemplatesByCategory = async (category: string): Promise<Template[]> => {
  try {
    await getAuthInstance();
    const q = query(collection(db, 'templates'), where('category', '==', category));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toMillis() || 0,
      updatedAt: doc.data().updatedAt?.toMillis() || 0,
    })) as Template[];
  } catch (error) {
    console.error('Error fetching templates by category:', error);
    throw error;
  }
};
