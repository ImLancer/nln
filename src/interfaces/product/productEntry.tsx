export default interface productEntry {
	prodName: string;
	prodBrand: string;
	prodSize: string[];
	prodPrice: number;
	prodImageUrl: FileList;
	prodBought: number;
	prodDate: Date;
	prodState: boolean;
	prodIsSale: boolean;
	prodSale: number;
	prodSalePrice: number;
	prodUrlList: string[];
}
