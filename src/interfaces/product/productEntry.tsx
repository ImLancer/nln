export default interface productEntry {
	prodId: string;
	prodName: string;
	prodBrand: string;
	prodSize: string[];
	prodPrice: number;
	prodImageUrl: FileList;
	prodBought: number;
	prodDate: Date;
	prodState: boolean;
	prodIsSale: boolean;
	prodNameSale: string;
	prodSale: number;
	prodSalePrice: number;
	prodUrlList: string[];
}
