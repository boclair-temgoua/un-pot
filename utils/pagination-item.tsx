interface Props {
    data: any,
    setPageItem: any
    setPreviewPageItem: any,
    setNextPageItem: any,
    paginate: any,
    isPreviousData: any;
    pageItem: number;
}

export type SortModel = 'ASC' | 'DESC'

export type PaginationRequest = {
    search?: string
    sort: SortModel
    page: number
    take: number
}

export const PaginationItem: React.FC<Props> = ({
    data,
    setPageItem,
    setPreviewPageItem,
    setNextPageItem,
    paginate,
    isPreviousData,
    pageItem,
}) => {
    return (
        <>
            {data?.data?.total > 0 && (
                <>
                    <div className='separator separator-dashed my-2'></div>

                    <div className="d-flex flex-center mb-0">
                        <ul className="pagination">
                            <li className={`page-item previous ${(isPreviousData || pageItem <= 1) && ('disabled')}`}>
                                <button type="button"
                                    onClick={() => {
                                        setPageItem(setPreviewPageItem)
                                        paginate(pageItem - 1)
                                    }}
                                    className="page-link" >
                                    <i className="previous"></i>
                                </button>
                            </li>
                            <li className="page-item active">
                                <button type="button" className="page-link">{pageItem}</button>
                            </li>
                            <li className={`page-item next ${(!isPreviousData && data?.data?.total_page === pageItem) && ('disabled')}`}>
                                <button type="button"
                                    onClick={() => {
                                        if (!isPreviousData && data?.data?.total_page !== pageItem) {
                                            setPageItem(setNextPageItem)
                                            paginate(pageItem + 1)
                                        }
                                    }}
                                    className="page-link" >
                                    <i className="next"></i>
                                </button>
                            </li>
                        </ul>
                    </div>
                </>
            )}

        </>
    );
};