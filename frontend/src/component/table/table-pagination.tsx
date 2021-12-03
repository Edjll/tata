interface TablePaginationProps {
    pageNumber: number,
    pageCount: number,
    maxButtons: number,
    clickHandler: Function,
    loading?: boolean
}

export const TablePagination = ({
                                    pageNumber,
                                    pageCount,
                                    maxButtons,
                                    clickHandler,
                                    loading = false
                                }: TablePaginationProps) => {

    const buttons = [];
    let maxPage = 1;

    if (loading) {
        buttons.push(<div key={'table__pagination__loading'} className={'table__pagination__loading'}>
            <div className={'table__pagination__loading__item'}/>
            <div className={'table__pagination__loading__item'}/>
            <div className={'table__pagination__loading__item'}/>
            <div className={'table__pagination__loading__item'}/>
            <div className={'table__pagination__loading__item'}/>
        </div>);
    } else {
        let leftIndex, rightIndex;
        maxPage = pageCount > 0 ? pageCount : 1;

        if (maxButtons < pageCount) {
            let buttonCount = maxButtons < maxPage ? maxButtons : maxPage;
            let buttonCountAround = Math.floor((buttonCount - ((buttonCount + 1) % 2)) / 2);

            let maxRightCount = maxPage - pageNumber - 1;
            let maxLeftCount = pageNumber;

            if (maxLeftCount < buttonCountAround) leftIndex = 0;
            else leftIndex = pageNumber - buttonCountAround;

            if (maxRightCount < buttonCountAround) rightIndex = pageNumber + maxRightCount;
            else rightIndex = pageNumber + buttonCountAround;

            let leftIndexTmp = leftIndex;
            leftIndex -= buttonCountAround - (rightIndex - pageNumber);
            rightIndex += buttonCountAround - (pageNumber - leftIndexTmp);
        } else {
            leftIndex = 0;
            rightIndex = pageCount - 1;
        }

        for (let i = leftIndex; i <= rightIndex; i++) {
            if (pageNumber === i) {
                buttons.push(
                    <div
                        key={i}
                        className={`table__pagination__button table__pagination__button_active`}
                    >{i + 1}</div>
                );
            } else {
                buttons.push(
                    <div
                        key={i}
                        className={`table__pagination__button`}
                        onClick={() => clickHandler(i)}
                    >{i + 1}</div>
                );
            }
        }
    }

    return (
        <div className={'table__pagination'}>
            {
                pageNumber === 0
                    ? <div className={`table__pagination__button table__pagination__previous table__pagination__button_disable`}>{'<'}</div>
                    : <div
                        className={`table__pagination__button table__pagination__previous`}
                        onClick={() => clickHandler(pageNumber - 1)}
                    >{'<'}</div>
            }

            {buttons}

            {
                pageNumber === maxPage - 1
                    ? <div className={`table__pagination__button table__pagination__next table__pagination__button_disable`}>{'>'}</div>
                    : <div
                        className={`table__pagination__button table__pagination__next`}
                        onClick={() => clickHandler(pageNumber + 1)}
                    >{'>'}</div>
            }
        </div>
    );
}