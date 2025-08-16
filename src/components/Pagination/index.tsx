interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
    showInfo?: boolean;
}

export function Pagination({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    totalItems,
    itemsPerPage = 10,
    showInfo = true 
}: PaginationProps) {
    
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
            return range;
        }

        rangeWithDots.push(1);

        if (currentPage - delta > 2) {
            rangeWithDots.push('...');
        }

        for (let i = Math.max(2, currentPage - delta); 
             i <= Math.min(totalPages - 1, currentPage + delta); 
             i++) {
            if (!rangeWithDots.includes(i)) {
                rangeWithDots.push(i);
            }
        }

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...');
        }

        if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    const visiblePages = totalPages > 1 ? getVisiblePages() : [];

    const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-6 mt-8">
            {showInfo && totalItems && (
                <div className="text-sm text-gray-400">
                    Mostrando <span className="font-medium text-white">{startItem}</span> até{' '}
                    <span className="font-medium text-white">{endItem}</span> de{' '}
                    <span className="font-medium text-white">{totalItems}</span> resultados
                </div>
            )}

            <div className="flex items-center">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`
                        relative inline-flex items-center px-3 py-2 rounded-l-lg border text-sm font-medium
                        ${currentPage === 1 
                            ? 'bg-container-modal border-pokemon-card-border text-gray-500 cursor-not-allowed' 
                            : 'bg-container-modal border-pokemon-card-border text-gray-300 hover:bg-background hover:text-white cursor-pointer'
                        }
                        transition-colors duration-200
                    `}
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="ml-1 hidden sm:block">Anterior</span>
                </button>

                <div className="flex">
                    {visiblePages.map((page, index) => (
                        <button
                            key={`${page}-${index}`}
                            onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
                            disabled={typeof page !== 'number'}
                            className={`
                                relative inline-flex items-center px-4 py-2 border text-sm font-medium
                                ${page === currentPage
                                    ? 'z-10 bg-input border-input text-white'
                                    : typeof page === 'number'
                                    ? 'bg-container-modal border-pokemon-card-border text-gray-300 hover:bg-background hover:text-white cursor-pointer'
                                    : 'bg-container-modal border-pokemon-card-border text-gray-500 cursor-default'
                                }
                                transition-colors duration-200
                                ${index === 0 ? '' : '-ml-px'}
                            `}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`
                        relative inline-flex items-center px-3 py-2 rounded-r-lg border text-sm font-medium -ml-px
                        ${currentPage === totalPages 
                            ? 'bg-container-modal border-pokemon-card-border text-gray-500 cursor-not-allowed' 
                            : 'bg-container-modal border-pokemon-card-border text-gray-300 hover:bg-background hover:text-white cursor-pointer'
                        }
                        transition-colors duration-200
                    `}
                >
                    <span className="mr-1 hidden sm:block">Próximo</span>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            <div className="sm:hidden flex items-center space-x-2">
                <span className="text-sm text-gray-400">
                    Página {currentPage} de {totalPages}
                </span>
            </div>
        </div>
    );
}
