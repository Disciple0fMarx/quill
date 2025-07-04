import { prisma } from "./prisma"

export const isAdmin = async (userId: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
    })
    return user?.role === 'ADMIN'
}
