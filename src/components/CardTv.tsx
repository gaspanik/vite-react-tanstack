import type { ReactNode } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

// tvを使ったカードコンポーネントの定義
const card = tv({
  // スロットの定義
  slots: {
    base: 'mt-4 max-w-md rounded-lg overflow-hidden shadow-md transition-all',
    image: 'w-full h-48 object-cover',
    content: 'p-6',
    title: 'text-xl font-bold mb-2',
    description: 'text-sm mt-2',
  },
  // バリアントの定義
  variants: {
    tone: {
      default: {
        base: 'bg-white',
        title: 'text-gray-900',
        description: 'text-gray-500',
      },
      dark: {
        base: 'bg-slate-900 shadow-xl',
        title: 'text-white',
        description: 'text-slate-400',
      },
      primary: {
        base: 'bg-blue-50',
        title: 'text-blue-700',
        description: 'text-blue-600',
      },
    },
  },
  // デフォルトのバリアント値
  defaultVariants: {
    tone: 'default',
  },
})

// tvの設定から型を自動抽出
type CardVariants = VariantProps<typeof card>

// コンポーネントのPropsを定義
// 自前のPropsと、抽出したVariants型を組み合わせる
interface CardProps extends CardVariants {
  title: string
  imageUrl?: string
  children: ReactNode
  className?: string // 追加のクラス名を受け取るためのオプション
}

// コンポーネント実装
export const Card = ({
  tone,
  title,
  imageUrl,
  children,
  className,
}: CardProps) => {
  // スロット関数の生成
  // tone を渡すと、そのモードのクラスが生成される
  const {
    base,
    image,
    content,
    title: titleClass,
    description,
  } = card({ tone })

  return (
    // tailwind-variants は twMerge 的な処理を自動でおこなう
    <div className={base({ class: className })}>
      {imageUrl && <img src={imageUrl} alt="Thumbnail" className={image()} />}
      <div className={content()}>
        <h3 className={titleClass()}>{title}</h3>
        <div className={description()}>{children}</div>
      </div>
    </div>
  )
}

