

export class Category{
    id:number;
    name:string;
    iconName:string;
    description:string;
    nameAr:string;
    descriptionAr:string;
    metaKeys:string;
    metaKeysAR:string;
    creationDate:Date;
    lastUpdatedDate:Date;
    recordStatus:Date;
    items:any[];
    subCategory:Category[];
    opened:boolean;
    parentCategoryID:number;
    parentCategory:Category[];
    parents:CategoriesRelation[];
    childs:CategoriesRelation[];
    parentsIDs:number[];
    groupCode:string;
    parentCategoryName:string;
    parentCategoryNameAr:string;
    
}
export class CategoriesRelation
{
    id:number;
    recordStatus:number;
    creationDate:Date;
    lastUpdatedDate:Date;
    parentCategoryID:number;
    childCategoryID:number;
    groupCode:string;
    parent:Category;
    child:Category;
}