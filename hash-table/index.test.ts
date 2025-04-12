const { HashTable } = require('.')

describe('[unit] HashTable', () => {
    const hashTable = new HashTable()
    beforeAll(() => {
        hashTable.set('Canada', 300)
        hashTable.set('France', 100)
        hashTable.set('Spain', 110)
    })
    test('Should retrieve the values', () => {
        expect(hashTable.get('Canada')).toStrictEqual(['Canada', 300])
        expect(hashTable.get('France')).toStrictEqual(['France', 100])
        expect(hashTable.get('Spain')).toStrictEqual(['Spain', 110])
    })
    test('Should remove value', () => {
        expect(hashTable.remove('Spain')).toBeTruthy()
        expect(hashTable.get('Spain')).toBeNull()
    })
})