export interface User {
    id: string,
    firstName: string,
    lastName: string,
    password: string,
    dob?: string,
    adminNotes?: string
}