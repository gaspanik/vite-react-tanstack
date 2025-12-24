import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Variant API を採用したボタンコンポーネント
 * `cva` でバリエーションを定義し、Figmaのように直感的に扱えるようにします。
 */

// cva でスタイル定義（第1引数: ベース、第2引数: バリアント設定）
const buttonVariants = cva(
  // 1. 共通スタイル（絶対に変わらない土台）
  'inline-flex items-center justify-center rounded-sm border px-4 py-2 cursor-pointer disabled:opacity-60 disabled:cursor-default',
  {
    // 2. 変化する部分（バリアント）の定義
    variants: {
      intent: {
        primary:
          'bg-neutral-800 text-white border-neutral-900 hover:bg-neutral-700',
        secondary: 'bg-white text-gray-500 border-gray-200',
      },
      size: {
        sm: 'text-sm',
        md: 'text-md',
      },
    },
    // 3. デフォルト値
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
)

// VariantProps を使って、cvaの設定から型（'primary' | 'secondary' 等）を自動抽出
type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export const Button = ({
  className,
  intent,
  size,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      // cva関数を実行すると、条件に合ったクラス文字列が返ってくる
      // cva で生成したクラス文字列を、さらに cn でラップして競合を解決するのが鉄則
      className={cn(buttonVariants({ intent, size }), className )}
      {...props}
    >
      {children}
    </button>
  )
}
