export class Order {
    constructor(
        public name: string,
        public contact: string,
        public gender: string,
        public dob: string,
        public orderDate: string,
        public orderType: string,
        public unit: number,
        public btcAddress: string,
        public rate?: number,
        public total?: number,
        public id?: number) {}
}
