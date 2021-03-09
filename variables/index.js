// Ceci est une variable classique
var myVariable = 'toto'
// Ceci est une constante
const myConstant = 'toto'

/**
 * Une variable peut être modifié
 * alors qu'une constante ne peut pas l'être après sa déclaration.
 *
 * Une variable possède un nom qui lui est propre.
 * Elle doit être déclaré par les mots clefs `var` ou `const`
 * pour pouvoir exister. Elle peut être utilisé par son nom
 * pour effectuer des opérations simples
 */

var myNumber = 1
myNumber = myNumber + 1
// Ici `myNumber` vaudra 2

/**
 * Une variable possède un type.
 * En javascript le type n'est pas explicité mais dans d'autres langages
 * il peut être nécessaire de spécifier le type d'information qu'une variable stock.
 * Pour le moment nous avons vu 4 différents type:
 * - String: chaîne de charactères (phrases)
 * - Number: un chiffre ou un nombre. Attention dans certains langages
 * les entiers et les décimales n'ont pas le même type
 * - Boolean: porte la valeur `true` ou la valeur `false`
 *
 * Une fois une variable créer avec un type, elle ne doit pas en changer.
 */