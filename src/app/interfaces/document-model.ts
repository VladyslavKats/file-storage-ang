export interface DocumentModel {
    id: number,
    name: string,
    size: number,
    contentType: string,
    path: string,
    userId: string,
    user: {
      id: string,
      name: string,
      email: string
    }
}
