import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Draw } from '../types';

const DRAWS_COLLECTION = 'draws';

export async function getDrawsByDate(date: Date): Promise<Draw[]> {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const q = query(
    collection(db, DRAWS_COLLECTION),
    where('date', '>=', startOfDay.toISOString()),
    where('date', '<=', endOfDay.toISOString())
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Draw));
}

export async function updateDrawWinner(drawId: string, isWinner: boolean): Promise<void> {
  const drawRef = doc(db, DRAWS_COLLECTION, drawId);
  await updateDoc(drawRef, { isWinner });
}