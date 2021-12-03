const ClassNameService = {
    generateString: (firstClass: string, secondClass: string | undefined): string => {
        console.log(firstClass, secondClass)
        if (secondClass !== undefined) return `${firstClass} ${secondClass}`
        return firstClass;
    }
}

export default ClassNameService;