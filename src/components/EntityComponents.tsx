import React from 'react'
import { Button } from './ui/button';
import { PlusIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';

type EntityHeaderProps = {
    title: string;
    description?: string;
    newButtonLabel: string;
    disabled?: boolean;
    isCreating?: boolean;
} & (
        | { onNew(): void; newButtonHref?: never }
        | { onNew?: never; newButtonHref: string }
        | { onNew?: never; newButtonHref?: never }

    )

export const EntityHeader = ({
    title,
    description,
    newButtonLabel,
    disabled,
    isCreating,
    onNew,
    newButtonHref

}: EntityHeaderProps) => {
    return (
        <div className='flex flex-row items-center justify-between gap-x-4 w-full'>
            <div className='flex flex-col'>
                <h1 className='text-lg md:text-xl font-semibold'>{title}</h1>
                {description && <p className='text-xs md:text-sm text-muted-foreground'>{description}</p>}
            </div>

            <div>
                {
                    onNew && !newButtonHref && (
                        <Button size='sm' className='mt-2' onClick={onNew} disabled={disabled || isCreating}>
                            <PlusIcon size={4} />
                            {newButtonLabel}
                        </Button>
                    )
                }


                {
                    !onNew && newButtonHref && (
                        <Button size='sm' className='mt-2' asChild disabled={disabled || isCreating}>
                            <Link href={newButtonHref}>
                                <PlusIcon size={4} />
                                {newButtonLabel}
                            </Link>
                        </Button>
                    )
                }
            </div>
        </div >
    )
}


type EntityContainerProps = {
    header: React.ReactNode;
    pagination?: React.ReactNode;
    search?: React.ReactNode;
    children: React.ReactNode;
}


export const EntityContainer = ({
    header,
    pagination,
    search,
    children
}: EntityContainerProps
) => {
    return (
        <div className='p-4 md:px-10 md:py-6 h-full'>
            <div className='mx-auto mx-w-screen-xl w-full flex flex-col gap-y-8 h-full'>
                {header}
                <div className='flex flex-col gap-y-4 h-full'>
                    {search}
                    {children}
                </div>
                {pagination}
            </div>
        </div>
    )
}



interface EntitySearchProps {
    placeholder?: string;
    value: string,
    onChange: (value: string) => void
}

export const EntitySearch = ({
    placeholder,
    value,
    onChange
}: EntitySearchProps) => {

    return (
        <div className='relative ml-auto'>
            <SearchIcon className='absolute  size-3.5 left-3 top-1/2 -translate-y-1/2 text-muted-foreground' />

            <Input
                className='max-w-[200px] bg-background shadow-none border-border pl-8'
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )

}


interface EntityPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    disabled?: boolean;
}

export const EntityPagination = ({
    page,
    totalPages,
    onPageChange,
    disabled
}: EntityPaginationProps) => {

    return (
        <div className='flex items-center justify-between gap-x-2 w-full'>
            <div className='flex-1 text-sm text-muted-foreground'>
                {`Page ${page} of ${totalPages || 1}`}
            </div>
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    disabled={disabled || page === 1}
                    onClick={() => { onPageChange(Math.max(1, page - 1)) }}
                    variant={"outline"}
                    size={"sm"}
                >
                    Previous
                </Button>

                <Button
                    disabled={page === totalPages || totalPages === 0 || disabled}
                    onClick={() => { onPageChange(Math.min(totalPages, page + 1)) }}
                    variant={"outline"}
                    size={"sm"}

                >
                    Next
                </Button>
            </div>
        </div>
    )


}   