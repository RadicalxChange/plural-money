'use server'

import { redirect } from 'next/navigation'

export async function redirectHandler(path: string) {
    redirect(path)
}