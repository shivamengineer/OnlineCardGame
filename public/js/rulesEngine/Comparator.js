class Comparator {
    constructor(){
        switch(Scanner.blocks[Scanner.index].comparatorType){
            case "<":
                this.comparator = ComparatorTypes.LESS_THAN;
                break;
            case ">":
                this.comparator = ComparatorTypes.GREATER_THAN;
                break;
            case "==":
                this.comparator = ComparatorTypes.EQUAL;
                break;
            case "<=":
                this.comparator = ComparatorTypes.LESS_THAN_EQUAL;
                break;
            case ">=":
                this.comparator = ComparatorTypes.GREATER_THAN_EQUAL;
                break;
            case "!=":
                this.comparator = ComparatorTypes.NOT_EQUAL;
                break;
            default:
                this.comparator = null;
                break;
        }
    }

    execute(){
        return this.comparator;
    }
}